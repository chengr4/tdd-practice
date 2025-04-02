package gameserver

class ParkingSessionRepository(private val parkingSessions: MutableList<ParkingSession>) {

    fun find() = parkingSessions[0]

}