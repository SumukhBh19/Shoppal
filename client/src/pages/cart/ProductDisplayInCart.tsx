interface ProductDisplayProps {
    title: string;
    price: number;
    quantity: number;
    thumbnail?: string;
    onRemoveProduct: () => void;
}

export const ProductDisplayInCart = ({ title, price, quantity, thumbnail, onRemoveProduct }: ProductDisplayProps) => {
    return (
        <div className="flex flex-row">
            <div
                className="grid w-full grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-t border-gray-200 
            tablet-lg:grid-cols-[3fr_1fr_1fr_1fr]
            tablet-sm:grid-cols-[3fr_1fr]"
            >
                {thumbnail && (
                    <div className="w-full ">
                        <div className="flex items-center space-x-4">
                            <img
                                src={thumbnail}
                                alt={title}
                                className="h-24 w-24 object-cover"
                            />
                            <div>
                                <div
                                    className="font-bold 
                                    tablet-lg:text-sm
                                    tablet-sm:text-xs"
                                >
                                    {title}
                                </div>
                                <div className="mt-2 hidden tablet-sm:hidden">
                                    <span>$</span> {price.toFixed(0)}
                                    <br />
                                    <span>Qty:</span> {quantity}
                                </div>
                                <button
                                    onClick={onRemoveProduct}
                                    className="mt-2 text-gray-500 underline"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="col-span-1 whitespace-nowrap px-6 py-4 text-sm tablet-lg:px-5
                    tablet-sm:px-0 tablet-sm:pr-5 tablet-sm:text-right"
                >
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}
                    <div className="mt-2 hidden tablet-sm:block">
                        <span className="font-semibold">Qty:</span> {quantity}
                    </div>
                </div>
                <div className="col-span-1 whitespace-nowrap px-6 py-4 text-sm tablet-lg:px-5 tablet-sm:hidden">
                    {quantity}
                </div>
                <div className="col-span-1 whitespace-nowrap px-6 py-4 text-sm tablet-sm:hidden">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price * quantity)}
                </div>
            </div>
        </div>
    );
};
