import Sidebar from "@repo/ui/Sidebar";
import { NAV_LINKS } from "@repo/utils/paths";

export default function Shell() {
  return (
    <div className="bg-green-light">
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen xl:px-28">
        <Sidebar navLinks={NAV_LINKS} />
      </div>
    </div>
  );
}
