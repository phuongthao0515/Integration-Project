import { Button, TextArea, Input, Text, Heading, Img } from "../../components";
import React from "react";

export default function ContactUs() {
    return (
        <>
            <div className="mx-auto mt-[126px] flex w-full max-w-[1088px] self-stretch md:px-5">
                <div className="w-full rounded-[18px] bg-gray-700_01 p-11 md:p-5">
                    <div className="flex items-start border-b border-solid border-black-900_02 md:flex-col">
                        <div className="flex flex-1 flex-col gap-[30px] md:self-stretch">
                            <Text
                                size="text8x1"
                                as="p"
                                className="w-[84%] font-redhatdisplay text-[51.2px] font-normal leading-[100%] text-neutral-white md:w-full md:text-[43px] sm:text-[37px]"
                            >
                                We are always ready to help you and answer your question
                            </Text>
                            <div className="flex flex-col gap-7">
                                <div className="mx-2.5 flex flex-col items-start gap-4 md:mx-0">
                                    <Text size="text5x1" as="p" className="text-[19.2px] font-medium text-neutral-white">
                                        Email
                                    </Text>
                                    <div className="flex border-b border-solid border-black-900_02">
                                        <Text size="text3x1" as="p" className="text-[16px] font-thin text-neutral-white">
                                            syahrulmiftahfarid@gmail.com
                                        </Text>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Text size="text5x1" as="p" className="text-[19.2px] font-medium text-neutral-white">
                                        Social Network
                                    </Text>
                                    <div className="flex gap-[19px] self-stretch">
                                        <Button shape="round" className="w-[38px] rounded-1g px-2">
                                            <Img src="images/img_icon.svg" />
                                        </Button>
                                        <Button shape="round" className="w-[38px] rounded-1g px-2">
                                            <Img src="images/img_telegram.svg" />
                                        </Button>
                                        <Button shape="round" className="w-[38px] rounded-b1-[10px] rounded-br-1g rounded-tl-[10px] rounded-tr-1g px-2.5">
                                            <Img src="images/img_icon_black_900_02.svg" />
                                        </Button>
                                        <Button shape="round" className="w-[38px] rounded-1g px-2">
                                            <Img src="images/img_discord.svg" />
                                        </Button>
                                        <Button shape="round" className="w-[38px] rounded-1g px-2">
                                            <Img src="images/img_youtube.svg" />
                                        </Button>
                                        <Button shape="round" className="w-[38px] rounded-1g px-2">
                                            <Img src="images/img_link.svg" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-12 flex w-[38%] flex-col items-start justify-center gap-[26px] rounded-[18px] border-[1.6px] border-solid border-brown bg-neutral-white px-8 py-7 shadow-x1 md:w-full sm:p-5">
                            <Heading
                                size="heading2x1"
                                as="h2"
                                className="font-redhatdisplay text-[22.4px] font-semibold text-black-900_02"
                            >
                                Get in Touch
                            </Heading>
                            <div className="flex flex-col gap-4 self-stretch">
                                <Text size="text3x1" as="p" className="text-[16px] font-normal leading-[22px] text-gray-800_03">
                                    Tell us your goals and what note taking means to you
                                </Text>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        color="neutral_white"
                                        size="md"
                                        type="text"
                                        name="name"
                                        placeholder={`Name`}
                                        className="rounded-1g border-[1.6px] border-solid border-black-900_02 px-[18px]"
                                    />
                                    <Input
                                        color="neutral_white"
                                        size="md"
                                        type="email"
                                        name="email"
                                        placeholder={`E-Mail`}
                                        className="rounded-1g border-[0.8px] border-solid border-black-900_02 px-[18px]"
                                    />
                                    <TextArea
                                        shape="round"
                                        name="message"
                                        placeholder={`Message`}
                                        className="rounded-lg !border-[0.8px] !border-gray-800_03 px-[18px] text-blue_gray-100"
                                    />
                                    <Button
                                        color="orange"
                                        size="2x1"
                                        className="self-stretch rounded-[24px] border-[1.2px] border-solid border-brown px-[32.8px] font-redhatdisplay font-bold sm: px-5"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}