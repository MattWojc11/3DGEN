import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { volume, material, quality, infill, quantity } = await req.json();

    const materialRates: Record<string, number> = {
      PLA: 0.08,    
      PETG: 0.09,
      ABS: 0.10,
      TPU: 0.15,
      Resin: 0.25,
    };

    const rate = materialRates[material] || 0.08;
    const mass = volume * 1.25; 
    
    const infillFactor = (20 + (infill * 0.8)) / 100;
    const exactMaterialUsed = mass * infillFactor;
    const materialCost = exactMaterialUsed * rate;

    const qualityMultipliers: Record<string, number> = {
      'Low': 0.6,
      'Normal': 1.0,
      'High': 1.8,
      'Ultra': 2.5
    };
    const qMult = qualityMultipliers[quality] || 1.0;
    
    const timeHours = (volume / 10) * qMult * infillFactor;
    const machineCostPerHour = 2.50; 
    const timeCost = timeHours * machineCostPerHour;

    const baseMargin = 15.0; 
    let netPrice = materialCost + timeCost + baseMargin;
    
    netPrice = netPrice * quantity;
    const grossPrice = netPrice * 1.23;

    // Simulate network delay for frontend UX realisms (micro-interaction)
    await new Promise(resolve => setTimeout(resolve, 300)); 

    return NextResponse.json({
      netPrice: Number(netPrice.toFixed(2)),
      grossPrice: Number(grossPrice.toFixed(2)),
      breakdown: {
        materialUsedGrams: Number(exactMaterialUsed.toFixed(1)),
        materialCost: Number((materialCost * quantity).toFixed(2)),
        timeCost: Number((timeCost * quantity).toFixed(2)),
        estimatedHours: Number((timeHours * quantity).toFixed(1)),
      }
    });

  } catch {
    return NextResponse.json({ error: 'Failed to calculate quote' }, { status: 500 });
  }
}
