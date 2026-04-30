import { redirect } from "next/navigation";

// Redirect to the testimonials section on the homepage
export default function TestimonialsPage() {
  redirect("/#testimonials");
}
