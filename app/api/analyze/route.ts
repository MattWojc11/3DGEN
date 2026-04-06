import { NextResponse } from 'next/server';

function parseBinarySTL(buffer: ArrayBuffer) {
  if (buffer.byteLength < 84) {
    throw new Error('File too small to be a valid binary STL.');
  }

  const view = new DataView(buffer);
  const numTriangles = view.getUint32(80, true);
  
  if (84 + numTriangles * 50 > buffer.byteLength) {
    throw new Error('Invalid STL: declared triangle count exceeds file size.');
  }

  let volume = 0;
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  let offset = 84;
  for (let i = 0; i < numTriangles; i++) {
    offset += 12; // skip Normal vector

    const v1x = view.getFloat32(offset, true); offset += 4;
    const v1y = view.getFloat32(offset, true); offset += 4;
    const v1z = view.getFloat32(offset, true); offset += 4;

    const v2x = view.getFloat32(offset, true); offset += 4;
    const v2y = view.getFloat32(offset, true); offset += 4;
    const v2z = view.getFloat32(offset, true); offset += 4;

    const v3x = view.getFloat32(offset, true); offset += 4;
    const v3y = view.getFloat32(offset, true); offset += 4;
    const v3z = view.getFloat32(offset, true); offset += 4;

    offset += 2; // skip Attribute byte count

    minX = Math.min(minX, v1x, v2x, v3x);
    minY = Math.min(minY, v1y, v2y, v3y);
    minZ = Math.min(minZ, v1z, v2z, v3z);
    maxX = Math.max(maxX, v1x, v2x, v3x);
    maxY = Math.max(maxY, v1y, v2y, v3y);
    maxZ = Math.max(maxZ, v1z, v2z, v3z);

    const v321 = v3x * v2y * v1z;
    const v231 = v2x * v3y * v1z;
    const v312 = v3x * v1y * v2z;
    const v132 = v1x * v3y * v2z;
    const v213 = v2x * v1y * v3z;
    const v123 = v1x * v2y * v3z;
    volume += (1.0 / 6.0) * (-v321 + v231 + v312 - v132 - v213 + v123);
  }

  return { 
    volumeCm3: Math.abs(volume) / 1000, 
    dimensions: { 
      x: (maxX - minX) / 10,  // returning cm
      y: (maxY - minY) / 10, 
      z: (maxZ - minZ) / 10 
    } 
  };
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    
    // Process only Binary STL for optimal performance
    const result = parseBinarySTL(buffer);

    return NextResponse.json(result);
  } catch (error: unknown) {
    const err = error as Error;
    console.error('STL Parse error:', err);
    return NextResponse.json({ error: err.message || 'Failed to analyze model' }, { status: 500 });
  }
}
