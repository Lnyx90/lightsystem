import React from "react";
import stats from "../js/Stats";

function GameStatusBar({ stats }) {
	return (
		<div className='fixed mt-20 flex justify-center w-full px-4'>
			<div className='flex flex-wrap items-center justify-center p-1 rounded-lg gap-5'>
				{stats.map(({ icon, value, color }, index) => (
					<div
						key={index}
						className='flex items-center gap-2 rounded-lg bg-white border-1 border-black p-1'
					>
						<img
							src={`/images/symbol/${icon}.png`}
							alt={icon}
							className='w-2 h-2 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mt-0.5'
						/>
						<div className='flex-1 relative'>
							<div className='h-1 md:h-2 lg:h-3 w-10 md:w-20 lg:w-30 bg-gray-300 rounded-full overflow-hidden'>
								<div
									className={`h-1 md:h-2 lg:h-3 lg:w-50 ${color} transition-all duration-300`}
									style={{ width: `${value}%` }}
								/>
							</div>
						</div>
						<span className='text-[3px] md:text-[6px] lg:text-base mt-1'>
							{value}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default GameStatusBar;