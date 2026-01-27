import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import { useUI } from '../../shared/UIContext';
import { AlertCircle, ChevronDown, ChevronUp, X } from 'lucide-react';

interface P2PEntryNoticeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAgree: () => void;
}

const P2PEntryNoticeModal: React.FC<P2PEntryNoticeModalProps> = ({ isOpen, onClose, onAgree }) => {
    const { t } = useUI();
    const [isExpanded, setIsExpanded] = useState(true);
    const [hasAgreed, setHasAgreed] = useState(false);

    const handleStart = () => {
        if (hasAgreed) {
            onAgree();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px] bg-[#1E2329] border-[#2B3139] text-white p-0 overflow-hidden">
                <div className="p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <AlertCircle className="w-6 h-6 text-yellow-500" />
                            {t('p2p.notice.title')}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 font-medium">
                            {t('p2p.notice.subtitle')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {t('p2p.notice.paragraph_intro')}
                        </p>

                        {isExpanded && (
                            <ul className="space-y-3">
                                {[1, 2, 3, 4].map((num) => (
                                    <li key={num} className="flex gap-3 text-sm text-gray-300">
                                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5" />
                                        <span>{t(`p2p.notice.bullets.${num}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    {t('p2p.notice.show_less')} <ChevronUp className="w-3 h-3" />
                                </>
                            ) : (
                                <>
                                    {t('p2p.notice.show_more')} <ChevronDown className="w-3 h-3" />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <DialogFooter className="bg-[#161A1E] p-6 flex-col sm:flex-col gap-4">
                    <div className="flex items-start space-x-3 w-full">
                        <Checkbox
                            id="p2p-agree"
                            checked={hasAgreed}
                            onCheckedChange={(checked) => setHasAgreed(checked === true)}
                            className="mt-0.5 border-gray-600 data-[state=checked]:bg-indigo-500"
                        />
                        <label
                            htmlFor="p2p-agree"
                            className="text-sm font-medium text-gray-300 cursor-pointer select-none"
                        >
                            {t('p2p.notice.agree_checkbox')}
                        </label>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <Button
                            onClick={handleStart}
                            disabled={!hasAgreed}
                            className={`w-full font-bold h-11 ${hasAgreed
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {t('p2p.notice.cta_start')}
                        </Button>
                        {!hasAgreed && (
                            <p className="text-[10px] text-center text-gray-500">
                                {t('p2p.notice.agree_required_reason')}
                            </p>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default P2PEntryNoticeModal;