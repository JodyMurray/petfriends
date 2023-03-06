import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UsernamePasswordForm = () => {


    const [userData, setUserData] = useState({
        new_password1: "",
        new_password2: "",
    });
    const { new_password1, new_password2 } = userData;

    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const { id } = useParams();

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();


    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
            history.push("/");
        }
    }, [currentUser, history, id]);

    // const handlePasswordSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await axiosRes.post("/dj-rest-auth/password/change/", userData);
    //         history.goBack();

    //     } catch (err) {
    //         console.log(err);
    //         setErrors(err.response?.data);
    //     }
    // };

    useEffect(() => {
        if (currentUser?.profile_id?.toString() === id) {
            setUsername(currentUser.username);
        } else {
            history.push("/");
        }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put("/dj-rest-auth/user/", {
                username,
            });
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
        event.preventDefault();
        try {
            await axiosRes.post("/dj-rest-auth/password/change/", userData);
            history.goBack();

        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col className="py-3 mx-auto text-center mt-4" md={6}>
                <Container className={appStyles.Content}>
                    {/* <Form onSubmit={handleSubmit} className="my-2">
                        <Form.Group>
                            <Form.Label>Change username</Form.Label>
                            <Form.Control
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        {errors?.username?.map((message, idx) => (
                            <Alert key={idx} variant="secondary">
                                {message}
                            </Alert>
                        ))}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Light}`}
                            type="submit"
                        >
                            save
                        </Button>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Light}`}
                            onClick={() => history.goBack()}
                        >
                            cancel
                        </Button>

                    </Form>
                </Container> */}

                {/* </Col>
            <Col className="py-2 mx-auto text-center mt-4" md={6}>
                <Container className={appStyles.Content}> */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Change username</Form.Label>
                        <Form.Control
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </Form.Group>
                    {errors?.username?.map((message, idx) => (
                        <Alert key={idx} variant="secondary">
                            {message}
                        </Alert>
                    ))}
                    <Form.Group>
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                            placeholder="new password"
                            type="password"
                            value={new_password1}
                            onChange={handleChange}
                            name="new_password1"
                        />
                    </Form.Group>
                    {errors?.new_password1?.map((message, idx) => (
                        <Alert key={idx} variant="secondary">
                            {message}
                        </Alert>
                    ))}
                    <Form.Group>
                        <Form.Label>Confirm new password</Form.Label>
                        <Form.Control
                            placeholder="confirm new password"
                            type="password"
                            value={new_password2}
                            onChange={handleChange}
                            name="new_password2"
                        />
                    </Form.Group>
                    {errors?.new_password2?.map((message, idx) => (
                        <Alert key={idx} variant="secondary">
                            {message}
                        </Alert>
                    ))}
                    <Button
                        type="submit"
                        className={`${btnStyles.Button} ${btnStyles.Light}`}
                    >
                        save
                    </Button>
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Light}`}
                        onClick={() => history.goBack()}
                    >
                        cancel
                    </Button>
                </Form>
            </Container>
        </Col>
        </Row >
    );
};

export default UsernamePasswordForm;