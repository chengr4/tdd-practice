package gameserver

import java.time.Duration

// What controller should do is format transformation
class GetParkingFeeController(private val getParkingFeeService: GetParkingFeeService) {

    // Calculate() not belongs to controller, it belongs to service
    fun calculate(): Int {

        return getParkingFeeService.doCalculate()
    }
}