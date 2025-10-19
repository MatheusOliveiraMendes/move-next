import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Home(props: HomeProps) {
    return (
        <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.page}>
                <Head>
                    <title>Home | MoveNext</title>
                </Head>

                <CountdownProvider>
                    <header className={styles.topbar}>
                        <div className={styles.logo}>
                            <img src="/icons/logo.svg" alt="MoveNext logo" />
                            <strong>MoveNext</strong>
                        </div>
                        <nav className={styles.navLinks}>
                            <button type="button" className={styles.navLinkActive}>Focus</button>
                            <button type="button">Challenges</button>
                            <button type="button">History</button>
                        </nav>
                        <span className={styles.levelBadge}>Lv. {props.level}</span>
                    </header>

                    <main className={styles.layout}>
                        <aside className={styles.sidebar}>
                            <div className={`${styles.panel} ${styles.profilePanel}`}>
                                <Profile />
                            </div>

                            <div className={`${styles.panel} ${styles.experiencePanel}`}>
                                <span className={styles.panelTitle}>Your journey</span>
                                <ExperienceBar />
                            </div>

                            <div className={`${styles.panel} ${styles.statsPanel}`}>
                                <span className={styles.panelTitle}>Today&apos;s summary</span>
                                <CompletedChallenges />
                            </div>
                        </aside>

                        <section className={styles.content}>
                            <div className={`${styles.panel} ${styles.focusPanel}`}>
                                <div>
                                    <h1>Ready to start the next cycle?</h1>
                                    <p>Use the timer to stay on track and earn XP with every focused break.</p>
                                </div>
                                <div className={styles.countdownWrapper}>
                                    <Countdown />
                                </div>
                            </div>

                            <div className={`${styles.panel} ${styles.challengePanel}`}>
                                <span className={styles.panelTitle}>Current challenge</span>
                                <ChallengeBox />
                            </div>
                        </section>
                    </main>
                </CountdownProvider>
            </div>
        </ChallengesProvider>

    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

    return {
        props: {
            level: Number(level),
            currentExperience: Number(currentExperience),
            challengesCompleted: Number(challengesCompleted)
        }
    }
}
