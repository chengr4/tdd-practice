package gameserver

import java.time.Duration

// What controller should do is format transformation
class GetParkingFeeController(private val parkingSessionRepository: ParkingSessionRepository) {
    // data from outside keep injecting to service
    val getParkingFeeService: GetParkingFeeService = GetParkingFeeService(parkingSessionRepository)

    // Calculate() not belongs to controller, it belongs to service
    fun calculate(): Int {

        return getParkingFeeService.doCalculate()
    }

}