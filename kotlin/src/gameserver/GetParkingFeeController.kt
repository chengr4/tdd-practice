package gameserver

import java.time.Duration

class GetParkingFeeController(private val parkingSessionRepository: ParkingSessionRepository) {

    fun calculate(): Int {

        // this behavior belongs to repository
        val parkingSession = parkingSessionRepository.find()

        val parkingSessionStartTime = parkingSession.startTime
        val parkingSessionEndTime = parkingSession.endTime

        val duration = Duration.between(parkingSessionStartTime, parkingSessionEndTime)
        val ceilingMinutes = getCeilingMinutes(duration)

        if (ceilingMinutes <= 15) {

            return 0
        }

        val ceilingHours = getCeilingHours(duration)

        return 60 * ceilingHours.toInt()
    }

    private fun getCeilingHours(duration: Duration): Long {
        val ceilingHours = duration.plusHours(1).minusNanos(1).toHours()
        return ceilingHours
    }

    private fun getCeilingMinutes(duration: Duration) = duration.plusMinutes(1).minusNanos(1).toMinutes()
}