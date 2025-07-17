import Sidebar from "@workspace/ui/Sidebar";
import { NAV_LINKS } from "@workspace/utils/paths";

export default function Shell() {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Sidebar navLinks={NAV_LINKS} />
      <div className="grid col-span-1 lg:col-span-4 gap-5"></div>
    </div>
  );
}
