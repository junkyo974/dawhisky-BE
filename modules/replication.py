from mysql.connector import connect
from mysql.connector.constants import ClientFlag
from replication import BinLogStreamReader

# MySQL 연결 설정
connection_settings = {
    'host': 'localhost',
    'port': 3306,
    'user': 'username',
    'password': 'password',
    'charset': 'utf8mb4',
    'client_flags': [ClientFlag.REMEMBER_OPTIONS],
}

# MySQL 연결
conn = connect(**connection_settings)

# 바이너리 로그 모니터링
stream = BinLogStreamReader(
    connection_settings=connection_settings,
    only_events=[],
    only_tables=['Ques'],  # 감지할 테이블 지정
    only_columns={'Ques': ['store_id']},  # 가져올 컬럼 지정
    resume_stream=True,  # 중단된 스트림 재개
)

# 변화 감지 이벤트 처리
for binlogevent in stream:
    for row in binlogevent.rows:
        if binlogevent.event_type == 'write_rows' and binlogevent.table == 'Ques':
            # Ques 테이블에 쓰기 작업이 발생한 경우
            store_id = row["values"]["store_id"]
            print("변화 감지 - store_id:", store_id)
            # 필요한 동작을 수행합니다.

# 연결 및 스트림 종료
stream.close()
conn.close()
