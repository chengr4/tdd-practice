# TDD Practice

- 在 Domain-Driven Design (DDD) 中，Aggregate 是一組關聯的物件，它們應作為一個單位進行資料變更
- Given => When => Then
- Feature Envy: 一個方法過度依賴於另一個物件的屬性或方法來執行其任務
- Controller: take care of the format transformation

## Keep in mind

- 在 clean code 的過程中，DB 決策應該推遲
- 沒有代表性的測試不要留
- inject repository to service and inject service to controller
- 修改通常從 controller 改起，因為是應用程式的最外層，與使用者互動的邊界

## References

- [Parking Fee Calculator](https://youtube.com/playlist?list=PLvBh-90IwbPKFUUFw1PTezAVQqi0PUhTB&si=rnNH-gnqbTvzIF5g)
