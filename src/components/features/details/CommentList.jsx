import React, { useEffect, useState, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/Button';
import Input from '../../common/Input';
import {
  getComment,
  postComment,
  deleteComment,
  patchComment,
} from '../../../redux/modules/commentSlice';
import { getDiaryId } from '../../../redux/modules/diarySlice';

function CommentList() {
  const params = useParams();
  const detail = useSelector((state) => state.diary.detail); // 일기 상세 아이디

  const { isLoading, error, comments } = useSelector((state) => state.comments);
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  // 댓글 수정 관련
  const select = useSelector((state) => state); // diary, comments 모두 있음
  const textList = select.comments.comments; // [{comment, id}] 배열임

  const text = textList.find((ele) => ele.id === params.id);
  // console.log(text);

  const beforeContent = useRef(text?.content);
  const [content, setContent] = useState(text?.content); // comment 내용

  const [readonly, setReadOnly] = useState(true); // true 일 때 읽기 상태 false 일 때 textarea

  // 댓글 수정하기
  const handleEdit = () => {
    setContent(beforeContent.current);
    setReadOnly(true);
  };
  // patchComment로 id 일치하지 않는 경우는 return함
  // id가 일치하는 값의 comment 내용
  const handlePatch = () => {
    dispatch(patchComment({ content, id: params.id }));
  };

  // 댓글 input
  const onChangeHandler = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  // 댓글 추가
  const addHandler = () => {
    if (input === '') {
      alert('댓글을 입력해주세요');
    } else {
      dispatch(postComment({ comment: input, detailId: params.id })); // key: value
      setInput(''); // 값입력된 후 초기화
    }
  };

  // 댓글 삭제
  const deleteHandler = (id) => {
    dispatch(deleteComment(id));
    // console.log(id);
  };

  // 처음 mount 될 때와 getComment() dispatch 가 실행될 때 렌더링됨
  // 댓글 가져오기
  useEffect(() => {
    dispatch(getComment({ detailId: params.id }));
  }, [dispatch, params]);

  // 일기 상세정보 가져오기
  useEffect(() => {
    dispatch(getDiaryId(params.id));
  }, [dispatch, params.id]);
  // useEffect(() => {
  //   dispatch(getDiaryId(detailId.id));
  // }, [dispatch, detailId.id]);
  // // console.log(params.id);
  // console.log(detailId.id);

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
        <Link to="/write">
          <Button color="#61bfad">다시 쓰기</Button>
        </Link>
      </LinkDiv>
      <DetailDiv>
        <Diary>
          <div className="title">{detail.title}</div>
          <div className="content">{detail.content}</div>
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
        <ContentBox>
          {readonly ? ( // {상태값? (ture) : (false)}
            <ContentBox>{!content ? text?.content : content}</ContentBox>
          ) : (
            // <ContentBox>읽기상태</ContentBox>
            <textarea
              className="textBox"
              rows="10"
              maxLength="200"
              value={!content ? text?.content : content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
          {}
        </ContentBox>
        <UpdateBox>
          <div>
            {comments &&
              comments.map((item) => (
                <div key={item.id}>
                  {/* <div style={{ borderBottom: '1px dotted #c4c4c4' }}> */}

                  <div>{item.comment}</div>

                  <div className="btnBox">
                    <Button color="#ff8b8b" type="button" onClick={() => deleteHandler(item.id)}>
                      삭제
                    </Button>
                    {readonly ? (
                      // 읽기 상태
                      <Button
                        color="#61bfad"
                        value="수정"
                        onClick={() => {
                          setReadOnly(!readonly);
                        }}
                      >
                        수정
                      </Button>
                    ) : (
                      // 수정 상태
                      <>
                        <Button
                          color="#61bfad"
                          value="완료"
                          onClick={() => {
                            setReadOnly(!readonly);
                            beforeContent.current = content;
                            handlePatch();
                          }}
                        >
                          완료
                        </Button>
                        <Button color="#ff8b8b" value="취소" onClick={handleEdit}>
                          {/* <Button color="#ff8b8b" value="취소"> */}
                          취소
                        </Button>
                      </>
                    )}
                    {/* <Button color="#61bfad" value="수정" onClick={()}>
                      수정
                    </Button> */}
                  </div>
                </div>
              ))}
          </div>
        </UpdateBox>
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
    font-size: 26px;
    margin: 10px 0 10px 0;
  }
  .content {
    font-size: 24px;
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

const UpdateBox = styled.div`
  .textArea li {
    list-style: none;
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
    margin-right: 10px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 50px;
  /* min-height: 550px; */
  line-height: 1.5;
  font-size: 18px;
  .textBox {
    width: 100%;
    border: 1px solid rgb(238, 238, 238);
    padding: 12px;
    font-size: 14px;
    line-height: 1.5;
    font-size: 18px;
  }
`;

// const TextBox = styled.textarea`
//   width: 100%;
//   border: 1px solid rgb(238, 238, 238);
//   padding: 12px;
//   font-size: 14px;
//   line-height: 1.5;
//   font-size: 18px;
// `;
