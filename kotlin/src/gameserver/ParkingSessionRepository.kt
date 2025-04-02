package gameserver

class ParkingSessionRepository(private val parkingSessions: MutableList<ParkingSession>) {

    fun find(plateNumber: String): ParkingSession {
        return parkingSessions.firstOrNull {it.plateNumber == plateNumber}
            ?: throw RuntimeException("No such plate number")
    }

    fun save(ps: ParkingSession) {
        parkingSessions.add(ps)
    }

}