package gameserver

import java.time.LocalDateTime


data class ParkingSession(
    var plateNumber: String,
    var startTime: LocalDateTime? = null,
    var endTime: LocalDateTime? = null
) {

    // Feature Envy
    fun driveOut(time: LocalDateTime) {
        endTime = time
    }

    // static
    companion object {
        fun driveIn(plateNumber: String, time: LocalDateTime): ParkingSession {
            val p = ParkingSession(plateNumber)
            p.startTime = time
            return p
        }
    }

}
