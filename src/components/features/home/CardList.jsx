import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getDiary, deleteDiary } from '../../../redux/modules/diarySlice';
import Button from '../../common/Button';

// 메인 페이지에 들어갈 컴포넌트
// LinkDiv 테스트용
function CardList() {
  const dispatch = useDispatch();
  const { isLoading, error, diary } = useSelector((state) => state.diary);
  // const [state, setState] = useState()
  // const { itemId } = useSelector((state) => state.diary);
  // const { isLoading, error, todos } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getDiary());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const onDelete = (itemId) => {
    console.log(itemId);
    dispatch(deleteDiary(itemId)).then(() => {
      window.location.replace('/');
    });
  };

  return (
    <DiaryBox>
      <h3>일기리스트</h3>
      <LinkDiv>
        <Link to="/write" className="datail">
          <span>일기쓰기</span>
        </Link>
      </LinkDiv>
      <LinkDiv>
        {/* <Link to="/details" className="datail">
          <span>일기 상세보기(일기 카드)</span>
        </Link> */}
        <StListContainer>
          {diary.map((item) => (
            <Link key={item.id} to={`/details/${item.id}`}>
              <StList>
                <div>
                  <div style={{ marginBottom: '10px' }}>{item.id}번째 일기</div>
                  <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                    일기 제목: {item.title}
                  </div>
                  <div style={{ width: '1000px' }}>{item.content}</div>
                </div>
                <Button
                  color="rgb(255, 128, 129)"
                  onClick={() => {
                    onDelete(item.id);
                  }}
                >
                  삭제
                </Button>
              </StList>
            </Link>
          ))}
        </StListContainer>
      </LinkDiv>
    </DiaryBox>
  );
}
// 이 DiaryBox 컴포넌트 안에 일기 리스트들, 일기쓰기 버튼, 삭제하기 버튼 넣기
// 일기리스트 저 글자는 임의로 적은 것임

export default CardList;

const DiaryBox = styled.div`
  //여기에 스타일 지정
`;

const LinkDiv = styled.div`
  display: block;
  margin: 10px 0 0 20px;
  font-size: 16px;
  a {
    color: #949393;
    text-decoration: none;
  }
`;

const StListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #877676;
  align-items: center;
  padding: 10px;
`;
