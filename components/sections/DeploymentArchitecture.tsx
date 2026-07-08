"use client";

import React from "react";
import { PRODUCT_NAME } from "@/lib/constants";

/**
 * DeploymentArchitecture - Highlights the secure, outbound-only architecture.
 */
export default function DeploymentArchitecture() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-transparent text-white relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Secure & Outbound-Only Architecture
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Unlike multi-tenant SaaS offerings, {PRODUCT_NAME} is deployed within your own environment, ensuring source and target data remain under your control at all times.
          </p>
          <ul className="space-y-4 text-gray-300 text-lg">
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 text-2xl">✓</span>
              <span><strong>Explicit Egress Allowlisting:</strong> A controlled, outbound-only network footprint requiring no inbound public internet access.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 text-2xl">✓</span>
              <span><strong>Privacy-Preserving AI:</strong> Only schema, metadata, and rule definitions reach the language model. No row-level business data is transmitted.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-3 text-2xl">✓</span>
              <span><strong>End-to-End Encryption:</strong> Authenticated application access, encrypted secrets, and encryption of data in transit and at rest.</span>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0 relative">
          <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] p-8 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-white/10 max-w-md w-full relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <h3 className="text-2xl font-semibold mb-6 text-center text-white">Customer Environment</h3>
            
            <div className="space-y-4">
              <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-md rounded-lg p-4 flex items-center border border-white/10">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-white">Data Sources</div>
                  <div className="text-sm text-gray-400">Oracle, Fabric, CSV</div>
                </div>
              </div>
              
              <div className="flex justify-center text-gray-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>

              <div className="bg-blue-600 rounded-lg p-4 flex items-center text-white shadow-lg border border-blue-500">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-lg">{PRODUCT_NAME} Server</div>
                  <div className="text-sm text-blue-100">Validation & Recon Engine</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-0.5 w-12 bg-white/20 relative">
                    <div className="absolute -right-1 -top-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white/20 transform rotate-45"></div>
                  </div>
                  <span className="mx-3 text-xs uppercase tracking-wider text-gray-500 font-semibold">Outbound Only</span>
                  <div className="h-0.5 w-12 bg-white/20"></div>
                </div>
                <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-md rounded px-3 py-1 text-sm text-gray-300 inline-block border border-white/10">Cloud AI / Email</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
