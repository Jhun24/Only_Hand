# POST : /setting/partner

    연인 관계를 확인하는 쿼리입니다

> Require

    user_token : 유저 토큰을 의미합니다
    Data type : String

    partner_token : 연인 토큰을 의미합니다
    Data type : String

    d_day : 연애일수를 의미합니다
    Data type : String

> Response : Success

    status : 200
    message : Send Success

> Response : Success

    status : 200
    message : 바람피지마라

> Response : Success

    status : 200
    message : 당신은 세컨드 입니다

> Require : Fail

    status : 401
    message : Unauthorized Token

> Require : Fail

    status : 401
    message : Unauthorized Partner Token

# POST : /setting/accept/partner

    연인 관계를 승낙하는 쿼리입니다

> Require

    couple_room_token : 연애 룸 토큰을 의미합니다
    Data type : String

    accept : 승낙 여부
    Data type : Boolean

> Response : Success (accept == true)

    status : 200
    message : Accept Success

> Response : Success (accept == false)

    status:200,
    message:"Accept Delete Success"

> Response : Fail

    status: 401
    message : Unauthorized Couple Room Token

> Response : Fail

    status: 401
    message : Unauthorized Female Token

> Response : Fail

    status: 401
    message : Unauthorized male Token

# GET : /setting/get/partner:/token

    요청온 연인 목록을 확인하는 쿼리입니다

> Require

    token : 사용자 토큰을 의미합니다
    Data type : String

> Response : Success

    status:200,
    couple_data:Schema[Couple] 참조,
    partner_data:Schema[User] 참조

> Response : Fail

   status : 404
   message : No Data

> Response : Fail

   status : 401
   message Unauthorized Token

> Response : Fail

   status : 401
   message Unauthorized Partner Token