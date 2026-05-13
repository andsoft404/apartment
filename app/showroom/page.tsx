import type { Metadata } from "next";
import PannellumShowroom from "../components/PannellumShowroom";

export const metadata: Metadata = {
  title: "360 Showroom | Monastery Tower",
  description: "Monastery Tower төслийн 360 showroom аялал.",
};

export default function ShowroomPage() {
  return (
    <main className="showroom-page">
      <PannellumShowroom />
    </main>
  );
}
