package gameserver

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.time.LocalDateTime

class GetParkingFeeControllerTest {
    // Declare the field for the system under test (sut)
    private lateinit var sut: GetParkingFeeController
    private lateinit var parkingSessionRepository: ParkingSessionRepository


    // The setup method is executed before each test,
    // so we use it to initialize our database (mock) and sut.
    @BeforeEach
    fun setup() {
        // inject the mock database
        parkingSessionRepository = ParkingSessionRepository(mutableListOf())
        // inject repository
        val getParkingFeeService = GetParkingFeeService(parkingSessionRepository)
        sut = GetParkingFeeController(getParkingFeeService)
    }

    @Test
    fun two_cars() {
        // (Semantics) Separate start time and end time in domain ParkingSession
        val p = ParkingSession.driveIn("AAA-111", LocalDateTime.parse("2021-01-01T00:00:00"))
        // mock database
        parkingSessionRepository.save(p)

        val pOut = parkingSessionRepository.find("AAA-111")

        pOut.driveOut(LocalDateTime.parse("2021-01-01T01:00:00"))
        parkingSessionRepository.save(pOut)

        val p2 = ParkingSession.driveIn("AAA-222", LocalDateTime.parse("2021-01-01T00:00:00"))
        // mock database
        parkingSessionRepository.save(p2)

        // Then
        assertEquals(60, sut.calculate("AAA-111"))
        assertEquals(0, sut.calculate("AAA-222"))
    }

    @Test
    fun park_1_hour_30_secs() {

        // (Semantics) Separate start time and end time in domain ParkingSession

        val p = ParkingSession.driveIn("AAA-111", LocalDateTime.parse("2021-01-01T00:00:00"))
        p.driveOut(LocalDateTime.parse("2021-01-01T01:00:30"))

        // mock database
        parkingSessionRepository.save(p)


        val actual: Int = sut.calculate("AAA-111")

        // Then
        assertEquals(120, actual)
    }

    @Test
    fun park_1_hour() {

        // (Semantics) Separate start time and end time in domain ParkingSession

        val p = ParkingSession.driveIn("AAA-111", LocalDateTime.parse("2021-01-01T00:00:00"))
        p.driveOut(LocalDateTime.parse("2021-01-01T01:00:00"))

        // mock database
        parkingSessionRepository.save(p)

        val actual: Int = sut.calculate("AAA-111")

        // Then
        assertEquals(60, actual)
    }

    @Test
    fun park_15_mins_30_secs() {
        val p = ParkingSession.driveIn("AAA-111", LocalDateTime.parse("2021-01-01T00:00:00"))
        p.driveOut(LocalDateTime.parse("2021-01-01T00:15:30"))

        // mock database
        parkingSessionRepository.save(p)

        val actual: Int = sut.calculate("AAA-111")

        // Then
        assertEquals(60, actual)
    }

    @Test
    fun park_15_mins() {
        val p = ParkingSession.driveIn("AAA-111", LocalDateTime.parse("2021-01-01T00:00:00"))
        p.driveOut(LocalDateTime.parse("2021-01-01T00:15:00"))

        // mock database
        parkingSessionRepository.save(p)

        val actual: Int = sut.calculate("AAA-111")

        // Then
        assertEquals(0, actual)
    }

}
