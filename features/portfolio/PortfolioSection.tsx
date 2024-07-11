import { PortfolioSectionClient } from "./PortfolioSectionClient";
import { getPortfolioFiles } from "./server-utils";

export async function PortfolioSection() {
  const files = await getPortfolioFiles();

  return <PortfolioSectionClient files={files} />;
}
