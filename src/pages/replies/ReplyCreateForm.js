import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function ReplyCreateForm(props) {
    const { post, setPost, setReplies, profileImage, profile_id } = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/reply/", {
                content,
                post,
            });
            setReplies((prevReplies) => ({
                ...prevReplies,
                results: [data, ...prevReplies.results],
            }));
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        reply_count: prevPost.results[0].reply_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Form className='mt-2' onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        placeholder="Share your thoughts!"
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={2}
                    />
                </InputGroup>
            </Form.Group>
            <button
                className={`${styles.Button} btn d-block m-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                post
            </button>
        </Form>
    );
}

export default ReplyCreateForm;