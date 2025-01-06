import { Img, Text, Radio, RadioGroup, Heading, CheckBox } from "../../components";
import React from "react";

export default function welcomesection1() {
    return (
        <>
            <div className="container-xs mr-[22px] px-14 md: mr-e md:px-5">
                <div className="ml-[22px] flex flex-col gap-2.5 md:ml-0">
                    <div className="flex items-center justify-between gap-5 md:flex-col">
                        <div className="relative h-[452px] flex-1 md:w-full md:flex-none md: self-stretch">
                            <div className="absolute bottom-[-0.40px] left-0 m-auto flex w-[74%] flex-col gap-8 rounded-[18px] border-[1.6px] border-solid border-gray-908_bf bg-white-a700 p-[38px] shadow-x1 sm:p-5"> <div className="flex flex-col items-start gap-1.5">
                                <Heading size="heading2x1" as="h1" className="text-[22.4px] font-semibold text-black-900_02">
                                    Web design
                                </Heading>
                                <Text
                                    size="text3x1"
                                    as="p"
                                    className="w-full text-[16px] font-normal leading-[22px] text-gray-800_03"
                                >
                                    Web design is a process of making a website for the user.
                                </Text>
                            </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <Img src="images/img_direct_hit.png" alt="Directhit" className="h-[28px] object-cover" /> <Heading size="headinglg" as="h2" className="text-[19.2px] font-semibold text-black-900_02">
                                            Goals
                                        </Heading>
                                    </div>
                                    <Text size="text3x1" as="p" className="text-[16px] font-normal leading-[22px] text-gray-880_03">
                                        The goal is to make the website easy to use for the user and drive the necessary growth.
                                    </Text>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <Img src="images/img_man_running.png" alt="Manrunning" className="h-[28px] object-cover" />
                                        <Heading size="headinglg" as="h3" className="text-[19.2px] font-semibold text-black-900_02">
                                            What to do?
                                        </Heading>
                                    </div>
                                    <div className="flex flex-col items-start gap-1.5">
                                        <CheckBox
                                            name="conductresearch"
                                            label="Conduct Research"
                                            id="conductresearch"
                                            className="gap-2 text-[16px] text-gray-808_03"
                                        />
                                        <CheckBox
                                            name="developwirefram"
                                            label="Develop wireframes"
                                            id="developwirefram"
                                            className="gap-2 text-[16px] text-gray-800_03"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Img
                                src="images/img_fountain_pen_s.svg"
                                alt="Fountainpens"
                                className="absolute right-[19%] top-8 m-auto h-[96px] w-[22% ] object-contain"
                            />
                        </div>
                        <div className="mb-[162px] flex flex-col items-start self-end">
                            <Text
                                size="text8x1"
                                as="p"
                                className="font-redhatdisplay text-[51.2px] font-normal text-amber-900 md:text-[43px] sm:text-[37px]"
                            >
                                Write Notes
                            </Text>
                            <Text size="text5x1" as="p" className="text-[19.2px] font-thin text-gray-900_02">
                                write any notes you want
                            </Text>
                        </div>
                    </div>
                    <div className="relative h-[534px] content-center md:h-auto">
                        <div className="flex flex-1 flex-col items-start">
                            <div className="relative z-[1] ml-[152px] flex w-[30%] rounded-br-[80px] rounded-t1-[54px] border-[1.2px] border-solid border-gray-900_bf px-[26px] py-[34px] md:ml- md:w-full sm:p-5">
                                <Img src="images/img_settings.svg" alt="Settings" className="mt-[76px] h-[14px]" />
                            </div>
                            <div className="relative mt-[-42px] flex items-center justify-between gap-5 self-stretch md:flex-col">
                                <div className="flex flex-col items-start">
                                    <Text
                                        size="text8x1"
                                        as="p"
                                        className="font-redhatdisplay text-[51.2px] font-normal text-amber-900 md:text-[43px] sm:text-[37px]"
                                    >
                                        Plan your day
                                    </Text>
                                    <Text size="text5x1" as="p" className="text-[19.2px] font-thin text-gray-900_02">
                                        Make sure your day is well planned
                                    </Text>
                                </div>
                                <div className="flex flex-1 flex-col items-end gap-[18px] md:self-stretch">
                                    <div className="flex w-[98%] items-center justify-center rounded-[18px] border-[1.6px] border-solid border-gray-900_bf bg-white-a700 p-[38px] shadow-xl md:w-full sm:p-5">\
                                        <div className="flex flex-1 flex-col items-start justify-center">
                                            <Heading size="heading2x1" as="h4" className="text-[22.4px] font-semibold text-black-900_02">
                                                Monday
                                            </Heading>
                                            <Text size="text3x1" as="p" className="text-[16px] font-normal text-gray-600_01">
                                                May, 3rd
                                            </Text>
                                        </div>
                                        <Img src="images/img_television.svg" alt="Television" className="h-[32px] rounded-[1px]" />
                                    </div>
                                    <div className="flex justify-end gap-2 self-stretch sm:flex-col">
                                        <RadioGroup
                                            name="frame78"
                                            className="flex flex-col rounded-[18px] border-[1.6px] border-solid border-gray-900_bf bg-white-a700 p-8 shadow-xl sm:p-5"
                                        >
                                            <Radio
                                                value="dolaundry"
                                                label="Do laundry"
                                                className="gap-2 pr-7 text-[16px] text-gray-800_03 sm:pr-5"
                                            />
                                            <Radio
                                                value="morningrun"
                                                label="Morning run"
                                                className="mt-4 gap-2 pr-5 text-[16px] text-gray-800_03"
                                            />
                                            <Radio
                                                value="callmom"
                                                label="Call mom"
                                                className="mt-4 gap-2 pr-[34px] text-[16px] text-gray-see_03 sm:pr-5"
                                            />
                                            <Radio value="gotowork" label="Go to work" className="mt-4 gap-2 text-[16px] text-gray-808_03" />
                                            <Radio
                                                value="dailymeeting"
                                                label="Daily meeting"
                                                className="mt-4 gap-2 pr-2 text-[16px] text-gray-800_03"
                                            />
                                            <Radio value="buydinner" label="Buy dinner" className="mt-4 gap-2 text-[16px] text-gray-s00_03" />
                                        </RadioGroup>
                                        <RadioGroup
                                            name="frame79"
                                            className="flex flex-col rounded-[18px] border-[1.6px] border-solid border-gray-900_bf bg-white-a700 p-8 shadow-x1 sm:p-5"
                                        >
                                            <Radio value="gotoschool" label="Go to school" className="gap-2 text-[16px] text-gray-s00_03" />
                                            <Radio
                                                value="study"
                                                label="Study"
                                                className="mt-4 gap-2 pr-[34px] text-[16px] text-gray-808_03 sm:pr-5"
                                            />
                                            <Radio
                                                value="dohomework"
                                                label="Do homework"
                                                className="mt-4 gap-2 pr-1 text-[16px] text-gray-see_03"
                                            />
                                            <Radio
                                                value="cooking"
                                                label="Cooking"
                                                className="mt-4 gap-2 pr-[34px] text-[16px] text-gray-800_03 sm:pr-5"
                                            />
                                            <Radio
                                                value="playsport"
                                                label="Play sport"
                                                className="mt-4 gap-2 pr-[34px] text-[16px] text-gray-880_03 sm:pr-5"
                                            />
                                            <Radio
                                                value="code"
                                                label="Code"
                                                className="mt-4 gap-2 pr-[34px] text-[16px] text-gray-800_03 sm:pr-5"
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Img
                            src="images/img_calendar_streamline_emoji.svg"
                            alt="Calendar"
                            className="absolute left-0 right-0 top-[12%] z-[2] mx-auto h-[106px] w-[12%] object-contain"
                        />
                    </div>
                    <div className="flex flex-col items-end">
                        <Img
                            src="images/img_arrow.svg"
                            alt="Arrow"
                            className="relative z-[3] mr-[180px] h-[158px] w-[3%] object-contain md: mr-8"
                        />
                        <div className="relative mt-[-36px] flex items-center justify-between gap-5 self-stretch md:flex-col">
                            <Img
                                src="images/img_timer_removebg_preview.png"
                                alt="Timerremovebg"
                                className="h-[282px] w-[50%] object-contain md:w-full"
                            />
                            <div className="flex flex-col items-start">
                                <Text
                                    size="text8x1"
                                    as="p"
                                    className="font-redhatdisplay text-[51.2px] font-normal text-amber-900 md:text-[43px] sm: text-[37px]"
                                >
                                    Pomodoro
                                </Text>
                                <Text size="text5x1" as="p" className="text-[19.2px] font-thin text-gray-980_02">
                                    It keeps your mind sharp
                                </Text>
                            </div>
                        </div>
                    </div>
                    <Img
                        src="images/img_arrow_gray_900_02.svg"
                        alt="Arrow"
                        className="ml-[140px] h-[112px] w-[42% ] object-contain md:ml-8"
                    />
                </div>
            </div>
        </>
    );
}