package gameserver

import java.time.LocalDateTime


data class ParkingSession(
    var startTime: LocalDateTime? = null,
    var endTime: LocalDateTime? = null
) {

    // static
    companion object {
        fun driveIn(time: LocalDateTime): ParkingSession {
            val p = ParkingSession()
            p.startTime = time
            return p
        }
    }

}
