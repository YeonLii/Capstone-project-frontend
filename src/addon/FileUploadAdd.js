import styled from "styled-components";
import Button from "../components/auth/Button";
import React, { useState } from "react";
import routes from "../routes";
import { gql, useMutation } from "apollo-server";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Switch } from "antd";
import "antd/dist/antd.min.css";


const StyledWrap = styled.div`
    height: 100%;
`;

const StyledTop = styled.div`
    height: 50%;
`;
const StyledBot = styled.div`
    height: 50%;
`;

const StyledTitle = styled.h1`
    font-size: 35px;
    text-align: center;
    padding-top: 10px;
    color: orange;
`;

const StyledVal = styled.div`
    font-size: 20px;
    padding-top: 15px;
    margin-left: 15px;
    color: tomato;
`;

const StyledButton = styled.span`
    margin-left: 35%;
`;
const StyledButton2 = styled.span`
    margin: 10px;
    margin-left: 30%;
    max-height: 100%;
`;

const StyledState = styled.span`
    margin-left: 10px;
`;

const CREATE_UPLOADINFO_MUTATION = gql`
    mutation createUploadInfo(
        $DelMeta : Boolean!
        $DelFull : Boolean!
        $DelSel  : Boolean!
        $FiltPriv: Boolean!
        $FiltFull: Boolean!
        $FiltSel : Boolean!
    ) {
        createUploadInfo(
            DelMeta : $Boolean
            DelFull : $Boolean
            DelSel  : $Boolean
            FiltPriv: $Boolean
            FiltFull: $Boolean
            FiltSel : $Boolean
        ) {
            ok
            error
        }
    }
`;

function FileUploadAdd() {
    const [delMeta, setdelMeta] = useState(false);
    const [filtPriv, setfiltPriv] = useState(false);

    const delMetaTog = () => {
        delMeta ? setdelMeta(false) : setdelMeta(true);
    };
    const filtPrivTog = () => {
        filtPriv ? setfiltPriv(false) : setfiltPriv(true);
    };

    const navigate = useNavigate();
    const onCompleted = (data) => {
        const { createUploadInfo: { ok }, } = data;
        if (!ok) {
            return;
        }
        navigate(routes.home, {
            message: "Account created. Please log in.",
        });
    }
    const [createUploadInfo, { loading }] = useMutation(CREATE_UPLOADINFO_MUTATION, {
        onCompleted,
    });
    const {
        register,
        handleSubmit,
        errors,
        formState,
        getValues,
    } = useForm({
        mode: "onChange",
    });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createUploadInfo({
            variables: {
                ...data,
            },
        });
    };
    return (
        <StyledWrap>
            <StyledTop>
                <StyledTitle>??????????????? ??????</StyledTitle>
                <StyledVal>
                    ??? ????????? ????????? ??????
                    <StyledButton2>
                        <Switch onClick={delMetaTog} />
                        {delMeta ? <StyledState>On</StyledState> : <StyledState>Off</StyledState>}
                    </StyledButton2>
                </StyledVal>
                <StyledVal>
                    ??? ?????? ?????? ??????
                    <StyledButton>
                        <Button
                            type="submit"
                            value="??????"
                        />
                    </StyledButton>
                </StyledVal>
                <StyledVal>
                    ??? ?????? ?????? ??????
                    <StyledButton>
                        <Button
                            type="submit"
                            value="??????"
                        />
                    </StyledButton>
                </StyledVal>
            </StyledTop>
            <StyledBot>
                <StyledTitle>???????????? ?????????</StyledTitle>
                <StyledVal>
                    ??? ????????? ????????? ??????
                    <StyledButton2>
                        <Switch onClick={filtPrivTog} />
                        {filtPriv ? <StyledState>On</StyledState> : <StyledState>Off</StyledState>}
                    </StyledButton2>
                </StyledVal>
                <StyledVal>
                    ??? ?????? ?????? ?????????
                    <StyledButton>
                        <Button
                            type="submit"
                            value="??????"
                        />
                    </StyledButton>
                </StyledVal>
                <StyledVal>
                    ??? ?????? ?????? ?????????
                    <StyledButton>
                        <Button
                            type="submit"
                            value="??????"
                        />
                    </StyledButton>
                </StyledVal>
            </StyledBot>
        </StyledWrap>
    );
}

export default FileUploadAdd;