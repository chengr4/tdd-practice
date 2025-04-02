package gameserver

// What controller should do is format transformation
class GetParkingFeeController(private val getParkingFeeService: GetParkingFeeService) {

    // the practical behavior of calculate not belongs to controller, it belongs to service
    fun calculate(plateNumber: String): Int {

        return getParkingFeeService.doCalculate(plateNumber)
    }
}