package gameserver

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class GetParkingFeeControllerTest {

    @Test
    fun free() {
        val sut = GetParkingFeeController()

        val actual: Int = sut.calculate()

        // Then
        assertEquals(0, actual)
    }
}