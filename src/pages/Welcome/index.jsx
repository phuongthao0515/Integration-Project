import { Helmet } from "react-helmet";
import { Button, Text, Img } from "../../components";
import Header from "../../components/Header";
import ContactUs from "./ContactUs";
import Welcome from "./Welcome";
import Welcome1 from "./Welcome1";
import React from "react";

export default function welcomePage() {
    return (
        <>
            <Helmet>
                <title>Note Taking Simplified - Noted for Students</title>
                <meta
                    name="description"
                    content="Discover Noted, the ultimate note-taking platform passionately crafted by students for a seamless, simple experience. Plan your day, collaborate in real-time, and elevate your note-taking game."
                />
            </Helmet>
            <div className="w-full bg-gray-100_01 shadow-lg">
                <div className="mb-1 flex flex-col items-center">
                    <div className="relative h-[2784px] self-stretch">
                        <div className="absolute left-0 right- top-8 mx-auto flex flex-1 flex-col items-end">
                            <Header />
                            <div className="self-stretch bg-deep_orange-50_02 py-24 md:py-5">
                                <Welcome />
                            </div>
                            <Img
                                src="images/img_clock_removebg_preview.png"
                                alt="Clockremovebg"
                                className="mr-[246px] mt-[1072px] h-[96px] w-[8%] object-contain md:mr-8"
                            />
                        </div>
                        <div className="absolute bottom-[-0.60px] left-e right-8 mx-auto flex flex-1 flex-col items-center gap-[26px] px-14 md:px-5">
                            <Welcome1 />
                            <div className="container-xs mr-[22px] flex justify-center md: mr-e">
                                <div className="flex w-full items-start md: flex-col">
                                    <Img
                                        src="images/img_team_1_removebg_preview.png"
                                        alt="Team1removebg"
                                        className="mt-1.5 h-[118px] w-[12%] object-contain md:w-full"
                                    />
                                    <div className="flex flex-1 flex-col items-start self-center md:self-stretch">
                                        <div className="flex items-start self-stretch sm:flex-col">
                                            <div className="flex flex-1 flex-col items-center px-14 md:px-5 sm:self-stretch">
                                                <Text
                                                    size="text8x1"
                                                    as="p"
                                                    className="font-redhatdisplay text-[51.2px] font-normal text-amber-900 md:text-[43px] sm:text-[37px]"
                                                >
                                                    Work with your team
                                                </Text>
                                                <Text size="text5x1" as="p" className="text-[19.2px] font-thin text-gray-900_02">
                                                    Never miss a meeting or deadline for team project
                                                </Text>
                                            </div>
                                            <Img
                                                src="images/img_team_removebg_preview.png"
                                                alt="Teamremovebg"
                                                className="h-[114px] w-[14%] self-center object-contain sm:w-full"
                                            />
                                        </div>
                                        <Img
                                            src="images/img_project_1.png"
                                            alt="Projectone"
                                            className="ml-[68px] h-[374px] w-[78%] rounded-[12px] object-contain md:ml-e"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-[384px] mr-[398px] mt-10 flex flex-col items-center self-stretch md:mx-0">
                        <div className="mx-auto flex w-full max-w-[516px] flex-col items-end self-stretch md:px-5">
                            <Img
                                src="images/img_arrow_gray_900_02_112x280.svg"
                                alt="Arrow"
                                className="h-[112px] w-[54%] object-contain"
                            />
                            <Img
                                src="images/img_mess_removebg_preview.png"
                                alt="Messremovebg"
                                className="relative mr-2.5 mt-[-40px] h-[182px] w-[32%] object-contain md:mr-e"
                            />
                        </div>
                        <div className="relative mt-[-68px] self-stretch">
                            <div className="m1-44 mr-[186px] flex flex-col items-center md:mx-e">
                                <Text
                                    size="text8x1"
                                    as="p"
                                    className="font-redhatdisplay text-[51.2px] font-normal text-amber-900 md:text-[43px] sm:text-[37px]"
                                >
                                    Chatting
                                </Text>
                                <Text size="text5x1" as="p" className="relative mt-[-10px] text-[19.2px] font-thin text-gray-900_02">
                                    Chat in Real-Time and Keep Ideas Flowing
                                </Text>
                            </div>
                            <Img
                                src="images/img_chat_removebg_preview.png"
                                alt="Chatremovebg"
                                className="relative mt-[-14px] h-[412px] w-full object-cover md:h-auto"
                            />
                        </div>
                    </div>
                    <div className="mx-auto mt-[78px] flex w-full max-w-[888px] flex-col items-start gap-[62px] self-stretch md:px-5 sm:gap-[31px]">
                        <div className="flex flex-col items-start gap-8 self-stretch">
                            <Img
                                src="images/img_coding.svg"
                                alt="Coding"
                                className="ml-[58px] h-[376px] w-[56%] object-contain md:ml-0"
                            />
                            <Text
                                size="text8x1"
                                as="p"
                                className="w-[64%] text-center font-redhatdisplay text-[51.2px] font-normal leading-[100%] text-gray-900_02 md:w-full md:text-[43px] sm:text-[37px]"
                            >
                                <span className="text-gray-900_02">Ready to take your&nbsp;</span>
                                <span className="text-amber-980">notes to the next level?</span>
                            </Text>
                        </div>
                        <Button
                            color="amber_900"
                            size="2x1"
                            className="ml-[236px] min-w-[106px] rounded-[24px] border-[1.2px] border-solid border-gray-900_02 px-[20.8px] font-redhatdisplay font-bold md:ml-0 sm:px-5"
                        >
                            Try Now
                        </Button>
                    </div>
                    <ContactusSection />
                </div>
            </div>
        </>
    );
}