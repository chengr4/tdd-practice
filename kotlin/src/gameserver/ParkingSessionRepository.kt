package gameserver

class ParkingSessionRepository(private val parkingSessions: MutableList<ParkingSession>) {

    fun find() = parkingSessions[0]

    fun save(ps: ParkingSession) {
        parkingSessions.add(ps)
    }

}