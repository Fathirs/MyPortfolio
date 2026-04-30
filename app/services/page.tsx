import { redirect } from "next/navigation";

// Redirect to the services/solutions section on the homepage
export default function ServicesPage() {
  redirect("/#solution");
}
