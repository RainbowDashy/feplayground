import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

function Topbar() {
    return (
        <div className={styles.topbar}>
            <div className={styles.left_nav}>Shanghai</div>
            <div className={styles.right_nav}>About</div>
        </div>
    );
}

function Nav() {
    return (
        <div className={styles.left_container}>
            <div className={styles.left_content}>今日头条</div>
            <div className={styles.left_content}>推荐</div>
            <div className={styles.left_content}>西瓜视频</div>
            <div className={styles.left_content}>热点</div>
            <div className={styles.left_content}>直播</div>
            <div className={styles.left_content}>图片</div>
            <div className={styles.left_content}>科技</div>
            <div className={styles.left_content}>娱乐</div>
            <div className={styles.left_content}>游戏</div>
            <div className={styles.left_content}>体育</div>
            <div className={styles.left_content}>懂车帝</div>
            <div className={styles.left_content}>懂车帝</div>
            <div className={styles.left_content}>数码</div>
            <div className={styles.left_content}>更多</div>
        </div>
    );
}

function Content() {
    const [data, setData] = useState([]);
    const loadFeed = () => {
        fetch("/api/news")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res.data);
                setData(data => [...data, ...res.data]);
            });
    };

    const buildFeed = (data, index) => {
        if (!data.single_mode) return;
        return (
            <div className={styles.single_mode} key={index}>
                <div className={styles.single_mode_lbox}>
                    <a className={styles.img_wrap}>
                        <img
                            src={"http:" + data.image_url}
                            className={styles.lazy_load_img}
                        />
                    </a>
                </div>
                <div className={styles.single_mode_rbox}>
                    <div className={styles.single_mode_rbox_inner}>
                        <div className={styles.title_box}>
                            <a
                                className={styles.link}
                                href={"http://toutiao.com" + data.source_url}
                            >
                                {data.title}
                            </a>
                        </div>
                        <div className={styles.footer_bar}>
                            <div className={styles.footer_bar_left}>
                                <a className={styles.footer_bar_action.source}>
                                    {data.source}
                                </a>
                                {data.comments_count && (
                                    <a
                                        className={
                                            styles.footer_bar_action.source
                                        }
                                    >
                                        {" ⋅ " +
                                            data.comments_count +
                                            " comments"}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const loader = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver);
        if (loader.current) observer.observe(loader.current);
    }, []);

    const handleObserver = (e) => {
        const target = e[0];
        if (target.isIntersecting) {
            loadFeed();
        }
    };

    return (
        <div className={styles.feed_container}>
            <div className={styles.feedbox_wrapper}>
                <div className={styles.feed_box}>{data.map(buildFeed)}</div>
            </div>
            <div ref={loader}>load more</div>
        </div>
    );
}

function More() {
    return (
        <div className={styles.right_container}>
            <div className={styles.search_container}>
                <input className={styles.search_input} placeholder="搜索" />
                <div className={styles.search_btn}>
                    <button type="button">搜索</button>
                </div>
            </div>
            <div className={styles.right_box}>
                <div className={styles.right_box_head}>更多</div>
                <ul className={styles.ul_wrapper}>
                    <li>关于头条</li>
                    <li>加入头条</li>
                    <li>用户协议</li>
                    <li>隐私政策</li>
                </ul>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <>
            <Head>
                <title>Simple toutiao</title>
            </Head>
            <Topbar />
            <div className={styles.main_container}>
                <Nav />
                <Content />
                <More />
            </div>
        </>
    );
}
