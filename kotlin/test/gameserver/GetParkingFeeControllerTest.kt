package gameserver

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDateTime

class GetParkingFeeControllerTest {

    @Test
    fun park_1_hour() {

        val p = ParkingSession(
            startTime = LocalDateTime.parse("2021-01-01T00:00:00"),
            endTime = LocalDateTime.parse("2021-01-01T01:00:00")
        )

        // mock database
        val parkingSessions = mutableListOf<ParkingSession>()
        parkingSessions.add(p)

        // inject data
        val sut = GetParkingFeeController(parkingSessions)

        val actual: Int = sut.calculate()

        // Then
        assertEquals(60, actual)
    }

    @Test
    fun free() {
        val p = ParkingSession(
            startTime = LocalDateTime.parse("2021-01-01T00:00:00"),
            endTime = LocalDateTime.parse("2021-01-01T00:15:00")
        )

        // mock database
        val parkingSessions = mutableListOf<ParkingSession>()
        parkingSessions.add(p)

        val sut = GetParkingFeeController(parkingSessions)

        val actual: Int = sut.calculate()

        // Then
        assertEquals(0, actual)
    }
}