// import { NextResponse } from "next/server";

// export function withCors(
//   response: NextResponse,
//   req?: Request
// ): NextResponse {
//   const origin = req?.headers.get('origin') || 'https://d89286238b6fbd.lhr.life';
  
//   response.headers.set('Access-Control-Allow-Origin', origin);
//   response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   response.headers.set('Access-Control-Allow-Credentials', 'true');
  
//   return response;
// }

// export function corsOptions(req: Request) {
//   const origin = req.headers.get('origin') || '*';
  
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': origin,
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       'Access-Control-Allow-Credentials': 'true',
//       'Access-Control-Max-Age': '86400',
//     },
//   });
// }