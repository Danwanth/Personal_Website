import { AchievementToasts } from './AchievementToasts'
import { AchievementsDialog } from './AchievementsDialog'

// Mounted once per page entry, inside <AchievementsProvider>.
export function AchievementsUI() {
  return (
    <>
      <AchievementToasts />
      <AchievementsDialog />
    </>
  )
}
