import { Carousel, Typography, Button } from "@material-tailwind/react";
import Globe from "../../../components/svg/Globe";
import FacebookLikeFilled from "../../../assets/FacebookLikeFilled";
import FacebookSendComment from "../../../assets/FacebookSendComment";

export function CarouselDefault() {
  return (
    <div className="max-w-lg max-h-[700px] flex items-center justify-center mx-auto my-36 place-content-center h-screen">
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute top-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 w-full px-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`w-1/${length} block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? " bg-white" : " bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {/* <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        /> */}
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-1/6 w-full bg-black/50">
            <div className=" text-left">
              <div className="pl-3 pt-8 text-white flex items-center justify-start gap-2">
                <div className="">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://app.metricool.com/api/v2/settings/brands/2957037/images?provider=FACEBOOK"
                    alt="Facebook page"
                  />
                </div>
                <div className="flex justify-center items-center gap-1">
                  <span className="font-bold">World Toure Guide </span>
                  <span className="text-white/80 text-sm">2 h</span>
                  <Globe width={12} height={12} fill="#D3D3D3" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 grid h-1/4 w-full  bg-black/50">
            <div className="absolute inset-x-0 bottom-0 grid p-5 w-full place-items-start bg-black/75">
              <div className="flex justify-center items-center gap-4">
                <input
                  type="text"
                  className="bg-transparent rounded-xl w-80 "
                  disabled={true}
                />
                <FacebookLikeFilled width={30} height={30} fill="#ffffff" />

                <FacebookSendComment width={35} height={35} fill="#ffffff" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          {/* <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          /> */}
          <video class="h-full w-full rounded-lg object-cover " controls>
            <source
              src="https://docs.material-tailwind.com/demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 grid h-1/6 w-full bg-black/50">
            <div className=" text-left">
              <div className="pl-3 pt-8 text-white flex items-center justify-start gap-2">
                <div className="">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://app.metricool.com/api/v2/settings/brands/2957037/images?provider=FACEBOOK"
                    alt="Facebook page"
                  />
                </div>
                <div className="flex justify-center items-center gap-1">
                  <span className="font-bold">World Toure Guide </span>
                  <span className="text-white/80 text-sm">2 mins</span>
                  <Globe width={12} height={12} fill="#D3D3D3" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 grid h-1/4 w-full  bg-black/50">
            <div className="absolute inset-x-0 bottom-0 grid p-5 w-full place-items-start bg-black/75">
              <div className="flex justify-center items-center gap-4">
                <input
                  type="text"
                  className="bg-transparent rounded-xl w-80 "
                  disabled={true}
                />
                <FacebookLikeFilled width={30} height={30} fill="#ffffff" />

                <FacebookSendComment width={35} height={35} fill="#ffffff" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                The Beauty of Nature
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                It is not so much for its beauty that the forest makes a claim
                upon men&apos;s hearts, as for that subtle something, that
                quality of air that emanation from old trees, that so
                wonderfully changes and renews a weary spirit.
              </Typography>
              <div className="flex gap-2">
                <Button size="lg" color="white">
                  Explore
                </Button>
                <Button size="lg" color="white" variant="text">
                  Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
            <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                The Beauty of Nature
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                It is not so much for its beauty that the forest makes a claim
                upon men&apos;s hearts, as for that subtle something, that
                quality of air that emanation from old trees, that so
                wonderfully changes and renews a weary spirit.
              </Typography>
              <div className="flex gap-2">
                <Button size="lg" color="white">
                  Explore
                </Button>
                <Button size="lg" color="white" variant="text">
                  Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
