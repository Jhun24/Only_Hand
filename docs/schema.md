# User

> id : String

    유저 아이디를 의미합니다
    
> password : String

    유저 비밀번호를 의미합니다
    
> token : String

    유저 토큰을 의미합니다
    
> partner : Boolean

    유저가 여친이 있는지를 판단합니다
    
> user_data : Object 

    유저 데이터와 관련된 오브젝트입니다
    
>> name : String

    유저 이름을 의미합니다
    
>> gender : String

    유저 성별을 의미합니다
    
>> profile_img_url : String

    유저 프로필 사진 URL을 의미합니다

>> phone_number : String

    유저 핸드폰 번호를 의미합니다
   
> couple : Object

    연인 정보를 의미합니다
    
>> couple_room_token : String

    연인과 함께하는 방 토큰을 의미합니다
    
>> couple_id : String

    연인 아이디를 의미합니다
    
>> couple_token : String

    연인 토큰을 의미합니다
    
>> couple_name : String

    연인 이름을 의미합니다
    
    
# Couple

> couple_accept : Boolean

    커플 신청 수락 여부를 의미합니다
    
> male_token : String

    남성 토큰을 의미합니다
    
> female_token : String

    여성 토큰을 의미합니다
    
> couple_room_token : String

    커플 룸 토큰을 의미합니다
    
> couple_data : Object

    커플과 관련된 데이터를 의미합니다
    
>> d_day : Number

    연애 기간을 의미합니다

>> photo_list : Array in Object

    커플 앨범을 의미합니다
    
>>> photo_url : String

    사진 URL을 의미합니다