package gameserver

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.time.LocalDateTime

class GetParkingFeeControllerTest {
    // Declare the field for the system under test (sut)
    private lateinit var sut: GetParkingFeeController

    // Declare a field for the parking sessions data source.
    private lateinit var parkingSessions: MutableList<ParkingSession>

    // The setup method is executed before each test,
    // so we use it to initialize our database (mock) and sut.
    @BeforeEach
    fun setup() {
        // Initialize the mock database
        parkingSessions = mutableListOf()
    }

    @Test
    fun park_1_hour() {

        // (Semantics) Separate start time and end time in domain ParkingSession

        val p = ParkingSession.driveIn(LocalDateTime.parse("2021-01-01T00:00:00"))
        p.endTime = LocalDateTime.parse("2021-01-01T01:00:00")

        // mock database
        parkingSessions.add(p)

        // inject data
        sut = GetParkingFeeController(parkingSessions)

        val actual: Int = sut.calculate()

        // Then
        assertEquals(60, actual)
    }

    @Test
    fun free() {
        val p = ParkingSession(
            startTime = LocalDateTime.parse("2021-01-01T00:00:00"),
        )
        p.endTime = LocalDateTime.parse("2021-01-01T00:15:00")


        // mock database
        parkingSessions.add(p)

        sut = GetParkingFeeController(parkingSessions)

        val actual: Int = sut.calculate()

        // Then
        assertEquals(0, actual)
    }
}