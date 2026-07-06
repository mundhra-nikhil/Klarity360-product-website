import { BASE_PATH } from '@/lib/constants';

export interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
}


export const industries: Industry[] = [
  {
    id: "automotive",
    name: "Automotive",
    description: "Accelerate production, optimize operations, create smarter CX.",
    image: `${BASE_PATH}/industries/automotive.avif`,
  },
  {
    id: "banking",
    name: "Banking",
    description: "Transform operations seamlessly with secure & compliant analytics.",
    image: `${BASE_PATH}/industries/banking.jpg`,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Modernize systems, automate workflows, make faster decisions.",
    image: `${BASE_PATH}/industries/healthcare.avif`,
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Automate claims, enhance underwriting, personalize customer engagement.",
    image: `${BASE_PATH}/industries/insurance.jpg`,
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    description: "Modernize operations for faster decisions, better forecasting.",
    image: `${BASE_PATH}/industries/logistics.jpg`,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Boost production speed, reduce downtime, improve forecast accuracy.",
    image: `${BASE_PATH}/industries/manufacturing.jpg`,
  },
  {
    id: "pharma",
    name: "Pharma",
    description: "Accelerate research, improve efficiency, deliver faster.",
    image: `${BASE_PATH}/industries/pharma.jpg`,
  },
  {
    id: "retail",
    name: "Retail & FMCG",
    description: "Digitize operations, automate tasks, deliver stronger customer connections.",
    image: `${BASE_PATH}/industries/retail.jpg`,
  },
  {
    id: "government",
    name: "Government",
    description: "Ensure resilient, compliant, and highly secure data reconciliation that meets the expectations of public sector.",
    image: `${BASE_PATH}/industries/government.jpg`,
  },
];
