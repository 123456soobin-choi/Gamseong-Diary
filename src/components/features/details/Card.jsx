import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { getDiaryId } from '../../../redux/modules/diarySlice';

function Card() {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const detailId = useSelector((state) => state.diary.detail);
  console.log(detailId);
  // console.log('찾을 값', id)
  // const { isLoading, error, diary } = useSelector((state) => state.diary);
  useEffect(() => {
    dispatch(getDiaryId(params.id));
  }, [dispatch, params.id]);

  return (
    <DiaryDetail>
      <LinkDiv>
        <Link to="/">
          <Button>돌아가기</Button>
        </Link>
        <Link to="/write">
          <Button>다시 쓰기</Button>
        </Link>
      </LinkDiv>
      <DetailDiv>
        <Diary>
          <div className="title">{detailId.title}</div>
          <div className="content">{detailId.content}</div>
        </Diary>
        <Comment>
          <Input type="text" name="commentNew" label="댓글을 작성해주세요" />
          <Button>댓글쓰기</Button>
        </Comment>
        <CommentList>
          <div className="commentPrev">나는 댓글이다</div>
          <div className="btnBox">
            <Button>삭제</Button>
            <Button>수정</Button>
          </div>
        </CommentList>
      </DetailDiv>
    </DiaryDetail>
  );
}

export default Card;

const DiaryDetail = styled.div`
  width: 100%;
  padding: 20px;
  background-color: gray; // 테스트
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
  background-color: #fff; // 테스트
`;

const Diary = styled.div`
  margin-bottom: 20px;
  border-bottom: 2px solid #333;

  .photo {
    width: 100%;
    height: 300px; // 임의값
    border: 1px solid #333;
  }

  .title {
    font-size: 22px;
    margin: 10px 0 10px 0;
  }

  .content {
    margin-bottom: 20px;
  }
`;

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #333;
  input {
    text-indent: 10px;
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
const CommentList = styled.div`
  /* display: flex;
  justify-content: space-between;
  flex-direction: column; */
  padding-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .commentPrev {
    width: 100%;
    height: 40px;
    border: 2px solid #c4c4c4;
  }
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
