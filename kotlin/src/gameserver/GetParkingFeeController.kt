package gameserver

import java.time.Duration

class GetParkingFeeController(val parkingSessions: MutableList<ParkingSession>) {
    fun calculate(): Int {
        val parkingSession = parkingSessions[0]

        val parkingSessionStartTime = parkingSession.startTime
        val parkingSessionEndTime = parkingSession.endTime

        val duration = Duration.between(parkingSessionStartTime, parkingSessionEndTime)
        val ceilingMinutes = duration.plus(Duration.ofMinutes(1)).minusNanos(1).toMinutes()
        
        if (ceilingMinutes <= 15) {

            return 0
        }

        return 60


    }
}