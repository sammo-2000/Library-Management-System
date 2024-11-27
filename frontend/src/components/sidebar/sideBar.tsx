import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { SidebarContentFooter } from "@/components/sidebar/sidebar.content.footer";
import { SidebarMainContent } from "@/components/sidebar/sidebar.main.content";

export async function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent className="p-2">
        <SidebarMainContent />
      </SidebarContent>

      <SidebarFooter>
        <SidebarContentFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
