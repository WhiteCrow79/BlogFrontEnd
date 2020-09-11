import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {

    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { form, auth, authError, user  } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }));
    }

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    //로그인 성공/실패 처리
    useEffect(() => {
        if(authError) {
            console.log('오류발생');
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if(auth) {
            console.log('로그인 성공');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    //user 값이 잘 설정되었는지 확인
    useEffect(() => {
        if(user) {
            history.push('/');
            console.log('check API 성공');
            console.log(user);
        }
    }, [history, user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />    
    );

};

export default withRouter(LoginForm);