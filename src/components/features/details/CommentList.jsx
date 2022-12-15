import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { getComment, postComment, deleteComment } from '../../../redux/modules/commentSlice';
import { getDiaryId, updateDiary } from '../../../redux/modules/diarySlice';

function CommentList() {
  const params = useParams();
  const detailId = useSelector((state) => state.diary.detail);

  const { isLoading, error, comments } = useSelector((state) => state.comments);
  const [input, setInput] = useState('');
  // const [input, setinput] = useState({ comment: '' });

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const addHandler = () => {
    if (input === '') {
      alert('댓글을 입력해주세요');
    } else {
      dispatch(postComment({ comment: input })); // key: value
      setInput(''); // 값입력된 후 초기화
    }
  };

  const deleteHandler = (id) => {
    dispatch(deleteComment(id)).then(() => {
      window.location.replace(`/details/${id}`);
    });
  };

  const onEditHandler = () => {
    dispatch(updateDiary(detailId));
  };

  useEffect(() => {
    dispatch(getDiaryId(params.id));
  }, [dispatch, params.id]);
  // 처음 mount 될 때와 getComment() dispatch 가 실행될 때 렌더링됨
  useEffect(() => {
    dispatch(getComment());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <DiaryDetail>
      <LinkDiv>
        <Link to="/">
          <Button color="#ff8b8b">돌아가기</Button>
        </Link>
        <Link to={`/details/${detailId.id}/update/`}>
          <Button color="#61bfad" onClick={onEditHandler}>
            다시 쓰기
          </Button>
        </Link>
      </LinkDiv>
      <DetailDiv>
        <Diary>
          <div style={{ marginBottom: '15x' }}>{detailId.id}번째 일기</div>
          <div className="title" style={{ fontSize: '2rem', marginBottom: '20px' }}>
            {detailId.title}
          </div>
          <div className="content" style={{ fontSize: '1rem', marginBottom: '15px' }}>
            {detailId.content}
          </div>
        </Diary>

        <InputBox>
          <Input
            type="text"
            name="comment"
            label="댓글을 작성해주세요"
            value={input}
            onChange={onChangeHandler}
          />
          <Button type="button" onClick={addHandler} color="#61bfad">
            댓글 쓰기
          </Button>
        </InputBox>
        <Comment>
          <div>
            {comments &&
              comments.map((item) => (
                <div key={item.id}>
                  <div style={{ border: '1px solid black' }}>
                    <div>{item.comment}</div>
                  </div>
                  <div className="btnBox">
                    <Button color="#ff8b8b" type="button" onClick={() => deleteHandler(item.id)}>
                      삭제
                    </Button>
                    <Button color="#61bfad" value="수정">
                      수정
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </Comment>
      </DetailDiv>
    </DiaryDetail>
  );
}

export default memo(CommentList);
// 컴포넌트의 state가 변경된 경우 - 불필요한 리렌더링 방지

const DiaryDetail = styled.div`
  width: 100%;
  padding: 20px;
`;

const LinkDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailDiv = styled.div`
  max-width: 800px;
  min-width: 600px;
  margin: 30px auto;
  padding: 20px;
`;

const Diary = styled.div`
  margin-bottom: 20px;
  border-bottom: 2px solid #333;

  .title {
    font-size: 22px;
    margin: 10px 0 10px 0;
  }
  .content {
    margin-bottom: 20px;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #333;
  input {
    height: 50px;
    text-indent: 10px;
    font-size: 18px;
    /* white-space: pre-line; */
  }
  button {
    width: 80px;
    height: auto;
    font-size: 14px;
    padding: 6px 6px;
    margin-top: 10px;
    margin-left: auto;
  }
`;
const Comment = styled.div`
  /* display: flex;
  justify-content: space-between;
  flex-direction: column; */
  padding-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .btnBox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  button {
    width: 80px;
    height: auto;
    font-size: 14px;
    padding: 6px 6px;
    margin-top: 10px;
  }
  button:first-child {
    margin-right: 10px;
  }
`;
