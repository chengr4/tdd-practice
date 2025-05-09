package gameserver

import java.time.Duration

class GetParkingFeeService(private val parkingSessionRepository: ParkingSessionRepository) {
    fun doCalculate(plateNumber: String): Int {
        // To get entity, use repository
        val parkingSession = parkingSessionRepository.find(plateNumber)

        val parkingSessionStartTime = parkingSession.startTime
        val parkingSessionEndTime = parkingSession.endTime
        if (parkingSession.endTime == null) {
            return 0
        }

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