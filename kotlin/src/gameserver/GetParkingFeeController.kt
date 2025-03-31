package gameserver

import java.time.Duration

class GetParkingFeeController(private val parkingSessions: MutableList<ParkingSession>) {
    fun calculate(): Int {
        val parkingSession = parkingSessions[0]

        val parkingSessionStartTime = parkingSession.startTime
        val parkingSessionEndTime = parkingSession.endTime

        val duration = Duration.between(parkingSessionStartTime, parkingSessionEndTime)
        val ceilingMinutes = getCeilingMinutes(duration)

        if (ceilingMinutes <= 15) {

            return 0
        }

        val ceilingHours = duration.plusHours(1).minusNanos(1).toHours()

        return 60 * ceilingHours.toInt()
    }

    private fun getCeilingMinutes(duration: Duration) = duration.plusMinutes(1).minusNanos(1).toMinutes()
}