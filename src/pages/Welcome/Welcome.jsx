import { Img, Text } from "../../components";
import React from "react";

export default function WelcomeSection() {
    return (
        <>
            <div className="flex items-center justify-center px-14 md:flex-col md:px-5">
                <div className="flex w-[52%] flex-col items-start gap-[18px] md:w-full">
                    <Text
                        size="text9x1"
                        as="p"
                        className="font-redhatdisplay text-[80px] font-normal leading-[100%] text-gray-900_02 md:text-[48px]"
                    >
                        <span className="text-amber-900">Note</span>
                        <span className="text-gray-900_02">
                            <>
                                &nbsp;taking
                                <br />
                                made simple
                            </>
                        </span>
                    </Text>
                    <Text size="text5x1" as="p" className="text-[19.2px] font-thin leading-[22px] text-gray-900_02">
                        <>
                            Passionately made by students.
                            <br />
                            Noted, the all in one note taking website.{" "}
                        </>
                    </Text>
                </div>
                <Img
                    src="images/img_bg_removebg_preview.png"
                    alt="Bgremovebg"
                    className="h-[528px] w-[42%] object-contain md:w-full"
                />
            </div>
        </>
    );
}
