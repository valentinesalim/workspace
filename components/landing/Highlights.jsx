const HighlightSection = ({ name, desc, img: image, idx, imgCss }) => {
  return (
    <div
      className={`flex flex-col ${
        idx & 1 ? 'md:flex-row-reverse' : 'md:flex-row'
      } md:px-16 py-12`}
    >
      <div className="w-full md:w-2/3 p-8 m-auto">
        <h2
          className={`text-white text-4xl font-bold mt-4 ${
            idx & 1 ? 'text-right' : 'text-left'
          }`}
        >
          {name}
        </h2>
        <p
          className={`text-md leading-5 text-white mt-2 ${
            idx & 1 ? 'text-right pl-24' : 'text-left pr-24'
          }`}
        >
          {desc}
        </p>
      </div>
      <div className={imgCss ? imgCss : 'w-full md:w-1/3 p-8 m-auto'}>
        <img className="w-full" src={`/images/${image}`} />
      </div>
    </div>
  );
};

export default function Highlights() {
  const sellingPoints = [
    {
      name: 'Co-whiteboard',
      desc:
        'Better than your average whiteboard, we helps you ideate, strategize, get organized and collaborate easier with your team.',
      img: 'co-whiteboard.png',
      imgCss: 'w-full md:w-1/3 m-0 lg:-m-16 mr-0'
    },
    {
      name: 'Co-browse',
      desc: 'Cobrowse the web together in real time with your friends.',
      img: 'co-browse.png',
      imgCss: 'w-full md:w-1/3 -m-8 ml-0'
    },
    {
      name: 'Co-notes',
      desc: 'Take notes and share it in real time with your friends.',
      img: 'co-notes.png'
    },
    {
      name: 'Plan better, Execute better',
      desc:
        'Manage your time efficiently and stay on-track towards your goals together. Boost your productivity and motivate each other!',
      img: 'plan-better.png'
    }
  ];
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-16 xl:px-0">
      <div className="flex flex-col items-center justify-center">
        {sellingPoints.map((el, idx) => (
          <HighlightSection key={idx} {...{ ...el, idx }} />
        ))}
        <img src="images/circles.png" className="absolute right-0" />
      </div>
    </div>
  );
}
