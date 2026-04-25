import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import AdminGallery from "./admin-gallery";

export default function AdminEngagementsGallery() {
  const { id } = useParams<{ id: string }>();
  return <AdminGallery engagementId={id} />;
}
