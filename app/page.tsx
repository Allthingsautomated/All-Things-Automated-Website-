import GlassAccountSettingsCard from "@/components/ui/glass-account-settings-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        <GlassAccountSettingsCard />
      </div>
    </main>
  )
}
